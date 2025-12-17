export class StripeService {
  async connect(credentials: any) {
    return { connected: true, service: 'stripe' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'stripe' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'stripe' };
  }
}
