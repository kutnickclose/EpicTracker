class Week < ActiveRecord::Base
  validates :week_num, :list_id, presence: true
  
  belongs_to :list
end
