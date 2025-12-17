export class OcuService {
  async connect(credentials: any) {
    return { connected: true, service: 'ocu' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'ocu' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'ocu' };
  }
}
