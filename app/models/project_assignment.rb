class ProjectAssignment < ActiveRecord::Base
  validates :user, :project, presence: true
  
  belongs_to :user, inverse_of: :project_assignments
  belongs_to :project, inverse_of: :project_assignments
end
