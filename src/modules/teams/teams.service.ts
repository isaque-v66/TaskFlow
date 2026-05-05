import { TeamsRepository } from "./teams.repository.js";

export class TeamsService {
  constructor(private repo: TeamsRepository) {}

  create(name: string, userId: string) {
    return this.repo.create(name, userId);
  }

  async addMember(teamId: string, userId: string, requesterId: string) {
    const membership = await this.repo.findMembership(requesterId, teamId);

    if (!membership || membership.role !== "ADMIN") {
      throw new Error("Only admin can add members");
    }

    return this.repo.addMember(teamId, userId);
  }
}