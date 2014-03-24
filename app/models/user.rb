class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  
  has_many :authorizations, :dependent => :destroy
  
  has_many :project_assignments
  has_many :projects, through: :project_assignments, source: :project, inverse_of: :users
  
  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
      data = access_token.info
      user = User.where(:email => data["email"]).first

      unless user
          user = User.create(name: data["name"],
               email: data["email"],
               password: Devise.friendly_token[0,20]
              )
      end
      user
  end
end
