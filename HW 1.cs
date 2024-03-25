using System;
using System.Collections.Generic;
using System.Linq;
namespace Set{
	public class Set<Element> where Element : IComparable{
		public List<Element> set;


		public Set(){
			set = new List<Element>();
		}

		public Set(List<Element> set){
			this.set = set;
		}


		//NOTE - Add functions here
		// Intersection operator 
    public static Set<Element> operator &(Set<Element> a, Set<Element> b)
    {
        List<Element> intersectionList = a.set.Intersect(b.set).ToList();
        return new Set<Element>(intersectionList);
    }

    // Difference operator 
    public static Set<Element> operator -(Set<Element> a, Set<Element> b)
    {
        List<Element> differenceList = a.set.Except(b.set).ToList();
        return new Set<Element>(differenceList);
    }

    // Adding a single element to the set
    public static Set<Element> operator +(Set<Element> set, Element element)
    {
        List<Element> updatedSet = new List<Element>(set.set);
        updatedSet.Add(element);
        return new Set<Element>(updatedSet);
    }

    // Equality operator 
    public static bool operator ==(Set<Element> a, Set<Element> b)
    {
        return a.set.SequenceEqual(b.set);
    }

    public static bool operator !=(Set<Element> a, Set<Element> b)
    {
        return !(a == b);
    }

    // True if the set is non-empty
    public static bool operator true(Set<Element> set)
    {
        return set.set.Count > 0;
    }

    // True if the set is empty
    public static bool operator false(Set<Element> set)
    {
        return set.set.Count == 0;
    }

    // Indexer for accessing elements by index
    public Element this[int index]
    {
        get { return set[index]; }
        set { set[index] = value; }

	}
}
} 
