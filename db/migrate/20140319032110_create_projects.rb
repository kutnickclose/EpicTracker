class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name, null: false, default: "Sample Project"

      t.timestamps
    end
  end
end
