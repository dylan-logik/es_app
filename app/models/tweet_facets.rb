module TweetFacets
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def hash_tag_facet
      Proc.new do
        facet 'hash_tag_facet' do
          terms :'hashtag.text'
        end
      end
    end

    def user_facet
      Proc.new do
        facet 'user_facet' do
          terms :'user.name'
        end
      end
    end
  end
end
