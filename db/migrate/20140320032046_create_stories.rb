class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.string :type, null: false
      t.string :points
      t.string :state, default: "unscheduled"
      t.string :description
      t.float :rank
      

      t.timestamps
    end
  end
end
