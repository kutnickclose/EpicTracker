class AddVelocity < ActiveRecord::Migration
  def change
    add_column :projects, :velocity, :integer, default: 10
  end
end
