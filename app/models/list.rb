class List < ActiveRecord::Base
  validates :name, :project_id, presence: true
  
  belongs_to :project
end
