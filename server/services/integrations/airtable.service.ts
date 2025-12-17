export class AirtableService {
  async connect(credentials: any) {
    return { connected: true, service: 'airtable' };
  }
  
  async sync(data: any) {
    return { synced: true, service: 'airtable' };
  }
  
  async getStatus() {
    return { status: 'connected', service: 'airtable' };
  }
}
