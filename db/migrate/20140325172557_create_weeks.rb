class CreateWeeks < ActiveRecord::Migration
  def change
    create_table :weeks do |t|
      t.integer :week_num, null: false
      t.string :start_date
      t.integer :list_id, null: false

      t.timestamps
    end
    add_index :weeks, :week_num
    add_index :weeks, :start_date
  end
end
