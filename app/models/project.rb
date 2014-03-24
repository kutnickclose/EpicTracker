class Project < ActiveRecord::Base
  validates :name, presence: true
  
  has_many :lists, dependent: :destroy
  has_many :project_assignments
  has_many :users, through: :project_assignments, source: :user, inverse_of: :projects
  
end
