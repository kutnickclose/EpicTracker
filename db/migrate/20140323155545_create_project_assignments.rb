class CreateProjectAssignments < ActiveRecord::Migration
  def change
    create_table :project_assignments do |t|
      t.integer :user_id
      t.integer :project_id

      t.timestamps
    end
    add_index :project_assignments, :user_id
    add_index :project_assignments, :project_id
  end
end
