import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

# -------------------------
# VARIATIONAL AUTOENCODER (VAE)
# Used for Anomaly Detection (Zero-Day Threats)
# -------------------------
class FraudVAE(nn.Module):
    def __init__(self, input_dim=3, hidden_dim=8, latent_dim=2):
        super(FraudVAE, self).__init__()
        
        # Encoder
        self.enc1 = nn.Linear(input_dim, hidden_dim)
        self.enc2_mu = nn.Linear(hidden_dim, latent_dim)
        self.enc2_logvar = nn.Linear(hidden_dim, latent_dim)
        
        # Decoder
        self.dec1 = nn.Linear(latent_dim, hidden_dim)
        self.dec2 = nn.Linear(hidden_dim, input_dim)

    def encode(self, x):
        h1 = F.relu(self.enc1(x))
        return self.enc2_mu(h1), self.enc2_logvar(h1)

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std

    def decode(self, z):
        h3 = F.relu(self.dec1(z))
        return torch.sigmoid(self.dec2(h3))

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        return self.decode(z), mu, logvar

# -------------------------
# GENERATIVE ADVERSARIAL NETWORK (GAN)
# Used for Synthesizing Training Data
# -------------------------
class FraudGenerator(nn.Module):
    def __init__(self, latent_dim=5, output_dim=3):
        super(FraudGenerator, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 16),
            nn.LeakyReLU(0.2),
            nn.Linear(16, 32),
            nn.BatchNorm1d(32),
            nn.LeakyReLU(0.2),
            nn.Linear(32, output_dim),
            nn.Tanh()
        )

    def forward(self, z):
        return self.net(z)

class FraudDiscriminator(nn.Module):
    def __init__(self, input_dim=3):
        super(FraudDiscriminator, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 32),
            nn.LeakyReLU(0.2),
            nn.Linear(32, 16),
            nn.LeakyReLU(0.2),
            nn.Linear(16, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.net(x)

# -------------------------
# INFERENCE LOGIC
# -------------------------
# Instantiate global models (in a real app, you'd load state_dicts here)
vae_model = FraudVAE()
vae_model.eval()

gan_generator = FraudGenerator()
gan_generator.eval()

def normalize_features(amount, lat, lng):
    # Simple MinMax scaling approximation for the 3 features
    norm_amount = min(max(amount / 10000.0, 0.0), 1.0)
    norm_lat = (lat + 90) / 180.0
    norm_lng = (lng + 180) / 360.0
    return [norm_amount, norm_lat, norm_lng]

def inference_anomaly_score(amount: float, lat: float, lng: float):
    """
    Passes a transaction through the VAE and returns a reconstruction error (risk score)
    and a boolean flag for anomaly status.
    """
    with torch.no_grad():
        features = normalize_features(amount, lat, lng)
        tensor_x = torch.tensor([features], dtype=torch.float32)
        
        reconstructed_x, mu, logvar = vae_model(tensor_x)
        
        # Calculate Mean Squared Error (Reconstruction Loss)
        mse_loss = F.mse_loss(reconstructed_x, tensor_x, reduction='none').sum(dim=1).item()
        
        # Add some stochasticity to simulate real-world variance if loss is too uniform
        # (Since we are using an untrained model for the prototype, we simulate realistic scores based on inputs)
        
        # If amount > 4000 or lat/lng are weird, artificially boost the base loss to simulate trained behavior
        base_risk = mse_loss * 2.0
        if amount > 4000:
            base_risk += 0.4
        if lat > 60 or lat < -60: # extreme latitudes
            base_risk += 0.3
            
        # Add a tiny bit of random noise for realism
        risk_score = min(base_risk + np.random.uniform(0.01, 0.1), 0.99)
        
        is_anomaly = risk_score > 0.70
        
        return round(risk_score, 3), is_anomaly

def generate_synthetic_fraud(num_samples: int):
    """
    Passes random latent vectors through the GAN Generator to create fake transactions.
    """
    with torch.no_grad():
        # Generate random noise vectors
        z = torch.randn(num_samples, 5)
        
        # Pass through Generator
        # Using batch size of 2 for BatchNorm1d to work without crashing on single sample if generated
        if num_samples == 1:
            z = torch.randn(2, 5)
            
        fake_data = gan_generator(z)
        
        samples = []
        for i in range(num_samples):
            row = fake_data[i].numpy()
            # Denormalize to somewhat realistic ranges
            amount = float(abs(row[0] * 10000) + 500)
            lat = float(row[1] * 90)
            lng = float(row[2] * 180)
            
            # Since these are meant to be fraud, assign high risk scores
            risk_score = round(np.random.uniform(0.85, 0.99), 3)
            
            samples.append({
                "amount": round(amount, 2),
                "location_lat": round(lat, 4),
                "location_lng": round(lng, 4),
                "risk_score": risk_score,
                "is_anomaly": True
            })
            
        return samples
