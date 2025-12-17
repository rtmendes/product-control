export class ShopifyService {
  async connect(credentials: any) {
    return { connected: true, service: 'shopify' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'shopify' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'shopify' };
  }
}
