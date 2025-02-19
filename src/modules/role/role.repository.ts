import { BaseRepository } from '../../core/repositoty';
import { IRole } from './role.interface';
import RoleSchema from './role.model';

export class RoleRepository extends BaseRepository<IRole> {
    constructor() {
        super(RoleSchema);
    }
}
