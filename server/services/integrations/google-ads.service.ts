export class Google-adsService {
  async connect(credentials: any) {
    return { connected: true, service: 'google-ads' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'google-ads' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'google-ads' };
  }
}
