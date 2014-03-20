class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.integer :project_id, null: false

      t.timestamps
    end
    add_index :lists, :project_id
  end
end
