import Base from './Base';
import type { IObject, Ressource, RessourceDB } from '../types';

export class RessourcesManager extends Base<Ressource> {
  constructor(app: App) {
    super(app);
  }
  public getRessources(user_id: string): Promise<Ressource[]> {
    return new Promise((resolve, reject) => {
      this.app.db.query<RessourceDB[]>('SELECT * FROM ressources WHERE author_id = ?', [user_id], async (err, results) => {
        if (err) return reject('Internal database error.');
        resolve(results);
      });
    });
  }
  public createRessource(ressource: Ressource): Promise<IObject> {
    return new Promise((resolve, reject) => {
      this.app.db.query<RessourceDB[]>(
        'INSERT INTO ressources (id, filename, file_size, file_type, original_path, transformed_path,author_id, created_timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          ressource.id,
          ressource.filename,
          ressource.file_size,
          ressource.file_type,
          ressource.original_path,
          ressource.transformed_path,
          ressource.author_id,
          ressource.created_timestamp,
        ],
        async err => {
          if (err) return reject('Internal database error.');
          resolve(ressource);
        },
      );
    });
  }
  public validate(data: Ressource): string | false {
    if (!data.id || data.id.length > 50) return 'ressource id invalid';
    if (!data.filename || data.filename.length > 50) return 'ressource filename invalid';
    if (!data.file_size) return 'ressource file size invalid';
    if (!data.file_type || data.file_type.length > 100) return 'ressource file type invalid';
    if (!data.original_path || data.original_path.length > 100) return 'ressource original path invalid';
    if (data.transformed_path && data.transformed_path.length > 100) return 'ressource transformed path invalid';
    if (!data.author_id || data.author_id.length > 50) return 'ressource author id invalid';
    if (!data.created_timestamp || data.created_timestamp.length > 50) return 'ressource created timestamp invalid';
    return false;
  }
}