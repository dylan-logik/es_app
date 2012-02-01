module Facets
  
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def page_count_facet
      Proc.new do
        facet 'page_count_facet' do
          terms :page_count
        end
      end
    end

    def name_facet
      Proc.new do
        facet 'name_facet' do
          terms :name
        end
      end
    end
  end
end
