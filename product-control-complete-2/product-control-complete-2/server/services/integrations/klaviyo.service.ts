export class KlaviyoService {
  async connect(credentials: any) {
    return { connected: true, service: 'klaviyo' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'klaviyo' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'klaviyo' };
  }
}
