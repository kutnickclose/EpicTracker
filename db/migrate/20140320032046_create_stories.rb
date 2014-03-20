class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.string :story_type, null: false
      t.string :points
      t.string :state, default: "unscheduled"
      t.string :description
      t.float :rank, null: false
      t.integer :list_id

      t.timestamps
    end
    add_index :stories, :rank
  end
end
