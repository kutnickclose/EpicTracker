class Story < ActiveRecord::Base
  validates :title, :story_type, :state, :rank, presence: true
  
  belongs_to :list
  # class_name: "Story",
  # foreign_key: :list_id,
  # primary_key: :id
  
end
