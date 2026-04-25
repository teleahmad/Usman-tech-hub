import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "database" for the demo
  let products = [
    { id: '1', name: 'iPhone 15 Pro Silicone Case - Deep Blue', price: 1200, category: 'Covers', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500', description: 'Soft-touch silicone case for premium protection.', stock: 45, rating: 4.8, reviews: 156 },
    { id: '2', name: '9H Tempered Glass for S24 Ultra', price: 450, category: 'Glass', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', description: 'Edge-to-edge transparent tempered glass.', stock: 90, rating: 4.6, reviews: 89 },
    { id: '3', name: 'AirPods Pro Gen 2 Silicon Cover', price: 350, category: 'Airpods', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', description: 'Protective skin for your AirPods case.', stock: 30, rating: 4.4, reviews: 42 },
    { id: '4', name: 'Fast 25W Samsung Charger', price: 1500, category: 'Chargers', image: 'https://images.unsplash.com/photo-1629831999818-42289c8907f1?w=500', description: 'Super fast charging adapter for Samsung devices.', stock: 25, rating: 4.9, reviews: 210 },
    { id: '5', name: 'USB-C to Lightning 1m Cable', price: 650, category: 'Cables', image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500', description: 'Braided long-lasting charging cable.', stock: 65, rating: 4.5, reviews: 55 },
    { id: '6', name: 'Oppo Reno 13F Transparent Case', price: 300, category: 'Covers', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', description: 'Clear shockproof case to show off your phone.', stock: 12, rating: 4.2, reviews: 18 },
    { id: '7', name: 'T800 Ultra Smartwatch', price: 2500, category: 'Smartwatches', image: 'https://images.unsplash.com/photo-1544117518-30df57809ca7?w=500', description: 'Premium clone with all health monitoring features.', stock: 15, rating: 4.1, reviews: 67 },
    { id: '8', name: 'MagSafe Leather Wallet', price: 850, category: 'Covers', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500', description: 'Magnetic leather wallet for iPhone.', stock: 20, rating: 4.7, reviews: 34 },
    { id: '9', name: 'Matte Glass for iPhone 15', price: 500, category: 'Glass', image: 'https://images.unsplash.com/photo-1585144860106-99131622340d?w=500', description: 'Anti-glare matte tempered glass.', stock: 40, rating: 4.5, reviews: 29 },
    { id: '10', name: '20W PD Apple Adapter', price: 2200, category: 'Chargers', image: 'https://images.unsplash.com/photo-1624835697666-419b671a5c43?w=500', description: 'Original-spec 20W PD adapter.', stock: 18, rating: 4.8, reviews: 142 },
    { id: '11', name: 'Samsung Buds 2 Case - Black', price: 400, category: 'Airpods', image: 'https://images.unsplash.com/photo-1606225457115-9b0de873c5db?w=500', description: 'Hard shell protection for Buds 2.', stock: 22, rating: 4.3, reviews: 15 },
    { id: '12', name: 'Redmi Note 12 Pro Glitter Case', price: 550, category: 'Covers', image: 'https://images.unsplash.com/photo-1586931316685-61876527af3f?w=500', description: 'Stylish glitter case for girls.', stock: 8, rating: 4.6, reviews: 56 },
    { id: '13', name: 'Green Lion UV Glass', price: 1800, category: 'Glass', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', description: 'UV glue glass for curved displays.', stock: 15, rating: 4.9, reviews: 45 },
    { id: '14', name: 'Wireless Charging Pad 15W', price: 1950, category: 'Chargers', image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500', description: 'Universal Qi wireless charger.', stock: 10, rating: 4.4, reviews: 30 },
    { id: '15', name: 'Anker Powerline III Cable', price: 2200, category: 'Cables', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', description: 'Strongest charging cable in the market.', stock: 12, rating: 5.0, reviews: 88 },
    { id: '16', name: 'Full Body Protection Combo', price: 1500, category: 'Covers', image: 'https://images.unsplash.com/photo-1625467096769-cf686fba727a?w=500', description: 'Glass + Case + Lens protector bundle.', stock: 25, rating: 4.7, reviews: 110 },
    { id: '17', name: 'Apple Watch Series 9 Strap', price: 950, category: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'Ocean strap for sports enthusiasts.', stock: 30, rating: 4.8, reviews: 44 },
    { id: '18', name: 'Camera Lens Protector (i15)', price: 400, category: 'Covers', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500', description: 'Diamond cut lens protection glass.', stock: 100, rating: 4.6, reviews: 93 },
    { id: '19', name: 'Privacy Glass for S23', price: 600, category: 'Glass', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500', description: 'Anti-spy tempered glass protector.', stock: 35, rating: 4.3, reviews: 37 },
    { id: '20', name: 'Car Charger 38W Dual Port', price: 1100, category: 'Chargers', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500', description: 'QC 3.0 fast charging for your car.', stock: 20, rating: 4.5, reviews: 29 },
    { id: '21', name: 'Magnetic Phone Mount', price: 750, category: 'Cables', image: 'https://images.unsplash.com/photo-1582236371239-165f17d23d85?w=500', description: 'Strong magnet for dashboard mounting.', stock: 50, rating: 4.2, reviews: 20 },
    { id: '22', name: 'Poco X5 Pro Armor Case', price: 900, category: 'Covers', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', description: 'Military grade shockproof protection.', stock: 18, rating: 4.8, reviews: 54 },
    { id: '23', name: 'Galaxy Z Flip 5 Thin Case', price: 1300, category: 'Covers', image: 'https://images.unsplash.com/photo-1625467096769-cf686fba727a?w=500', description: 'Ultra slim case for foldables.', stock: 10, rating: 4.4, reviews: 15 },
    { id: '24', name: 'iPad Pro 11-inch Smart Cover', price: 2500, category: 'Covers', image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ff20b5?w=500', description: 'Wake/Sleep feature smart folio.', stock: 15, rating: 4.9, reviews: 32 },
    { id: '25', name: 'Type-C to 3.5mm Dongle', price: 600, category: 'Cables', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', description: 'High quality DAC audio converter.', stock: 40, rating: 4.1, reviews: 19 },
    { id: '26', name: 'Baseus 65W GaN Charger', price: 4500, category: 'Chargers', image: 'https://images.unsplash.com/photo-1624835697666-419b671a5c43?w=500', description: 'Compact GaN fast charger for laptops/phones.', stock: 5, rating: 5.0, reviews: 75 },
    { id: '27', name: 'M9 Ultra Smartwatch', price: 3800, category: 'Smartwatches', image: 'https://images.unsplash.com/photo-1544117518-30df57809ca7?w=500', description: 'AMOLED display smartwatch with calling.', stock: 12, rating: 4.5, reviews: 48 },
    { id: '28', name: 'Joyroom Waterproof Case', price: 1200, category: 'Covers', image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ff20b5?w=500', description: 'Submersible dry bag for phones.', stock: 25, rating: 4.6, reviews: 22 },
    { id: '29', name: 'Ceramic Glass for Redmi', price: 300, category: 'Glass', image: 'https://images.unsplash.com/photo-1585144860106-99131622340d?w=500', description: 'Unbreakable flexible ceramic film.', stock: 100, rating: 4.0, reviews: 110 },
    { id: '30', name: 'Micro USB 2m Durable Cable', price: 350, category: 'Cables', image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500', description: 'Long cable for older android devices.', stock: 60, rating: 4.2, reviews: 40 },
    { id: '31', name: 'Apple Pencil 2nd Gen Silicone Pouch', price: 450, category: 'Covers', image: 'https://images.unsplash.com/photo-1582236371239-165f17d23d85?w=500', description: 'Grip and protection for Apple Pencil.', stock: 30, rating: 4.7, reviews: 26 },
    { id: '32', name: 'Pixel 7 Pro Spigen Case', price: 2800, category: 'Covers', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500', description: 'Official Spigen rugged armor case.', stock: 8, rating: 4.9, reviews: 54 },
    { id: '33', name: 'Oppo A78 Rainbow Glass', price: 450, category: 'Glass', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', description: 'Effect-based colorful tempered glass.', stock: 40, rating: 4.3, reviews: 21 },
    { id: '34', name: 'UGreen 3-in-1 Cable', price: 1800, category: 'Cables', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', description: 'Lightning + Type-C + Micro combo cable.', stock: 22, rating: 4.8, reviews: 63 },
    { id: '35', name: 'Hoco ES42 AirPods Clone', price: 4200, category: 'Airpods', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', description: 'Best sounding AirPods Pro replica.', stock: 15, rating: 4.7, reviews: 94 },
    { id: '36', name: 'Smart Tag Case - Leather', price: 550, category: 'Covers', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500', description: 'Keychain holder for SmartTags.', stock: 50, rating: 4.5, reviews: 18 },
    { id: '37', name: 'Realme 11 Pro+ Matte Case', price: 650, category: 'Covers', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', description: 'Fingerprint-proof matte texture case.', stock: 25, rating: 4.4, reviews: 33 },
    { id: '38', name: 'Solar Power Bank 20000mAh', price: 3500, category: 'Chargers', image: 'https://images.unsplash.com/photo-1624835697666-419b671a5c43?w=500', description: 'Outdoor battery with solar charging.', stock: 10, rating: 4.2, reviews: 25 },
    { id: '39', name: 'NFC Business Card Ring', price: 2100, category: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'Share contact info with a tap.', stock: 20, rating: 4.6, reviews: 14 },
    { id: '40', name: 'Hydrogel Film for iWatch', price: 200, category: 'Glass', image: 'https://images.unsplash.com/photo-1585144860106-99131622340d?w=500', description: 'Self-healing screen protector film.', stock: 150, rating: 4.3, reviews: 50 },
    { id: '41', name: 'Gaming Finger Sleeves', price: 150, category: 'Cables', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', description: 'Sweatproof sleeves for PUBG / FreeFire.', stock: 200, rating: 4.8, reviews: 150 },
    { id: '42', name: 'Infinix Hot 30 Carbon Case', price: 450, category: 'Covers', image: 'https://images.unsplash.com/photo-1625467096769-cf686fba727a?w=500', description: 'Carbon fiber texture protective case.', stock: 35, rating: 4.1, reviews: 29 },
    { id: '43', name: 'Mi Band 8 Metal Strap', price: 1250, category: 'Smartwatches', image: 'https://images.unsplash.com/photo-1544117518-30df57809ca7?w=500', description: 'Stainless steel luxury strap.', stock: 15, rating: 4.7, reviews: 41 },
    { id: '44', name: 'Lens Cleaning Kit', price: 300, category: 'Cables', image: 'https://images.unsplash.com/photo-1582236371239-165f17d23d85?w=500', description: 'Spray + Cloth for crystal clear photos.', stock: 100, rating: 4.9, reviews: 65 },
    { id: '45', name: 'Vivo V29 3D Glass', price: 950, category: 'Glass', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', description: 'Full coverage 3D curved glass.', stock: 25, rating: 4.5, reviews: 30 },
    { id: '46', name: 'Aesthetic Floral Case', price: 700, category: 'Covers', image: 'https://images.unsplash.com/photo-1586931316685-61876527af3f?w=500', description: 'Hand-painted look floral case.', stock: 12, rating: 4.8, reviews: 44 },
    { id: '47', name: 'Magnetic Desk Cable Holder', price: 400, category: 'Cables', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', description: 'Organize your charging cables easily.', stock: 50, rating: 4.4, reviews: 18 },
    { id: '48', name: 'OTG Adapter USB to Type-C', price: 250, category: 'Cables', image: 'https://images.unsplash.com/photo-1582236371239-165f17d23d85?w=500', description: 'Connect pen-drives to your phone.', stock: 100, rating: 4.3, reviews: 35 },
    { id: '49', name: 'Selfie Ring Light with Stand', price: 2100, category: 'Chargers', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500', description: 'Perfect lighting for creators.', stock: 15, rating: 4.6, reviews: 55 },
    { id: '50', name: 'Anti-Glare Glass for Gamers', price: 650, category: 'Glass', image: 'https://images.unsplash.com/photo-1585144860106-99131622340d?w=500', description: 'Matte tempered glass for competitive play.', stock: 40, rating: 4.8, reviews: 72 }
  ];

  let orders: any[] = [];

  const isProd = process.env.NODE_ENV === 'production';

  // API Routes - Defined BEFORE Vite/Static middleware
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
  });

  app.get('/api/products', (req, res) => {
    console.log('GET /api/products');
    res.json(products);
  });

  app.post('/api/products', (req, res) => {
    const newProduct = { ...req.body, id: Date.now().toString() };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.map(p => p.id === id ? { ...p, ...req.body } : p);
    res.json({ message: 'Product updated' });
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Product deleted' });
  });

  // Orders
  app.get('/api/orders', (req, res) => {
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const order = { ...req.body, id: Date.now().toString(), status: 'pending', date: new Date() };
    orders.push(order);
    res.status(201).json(order);
  });

  app.patch('/api/orders/:id/approve', (req, res) => {
    const { id } = req.params;
    orders = orders.map(o => o.id === id ? { ...o, status: 'approved' } : o);
    res.json({ message: 'Order approved' });
  });

  // Repair Requests
  let repairRequests: any[] = [];
  app.post('/api/repair', (req, res) => {
    const request = { ...req.body, id: Date.now().toString(), status: 'new' };
    repairRequests.push(request);
    res.status(201).json(request);
  });

  // Vite middleware for development
  if (!isProd) {
    console.log('Starting Vite in development mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Serving static files in production mode...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
