#include <bits/stdc++.h>
#include <string> //for to_string() function
#include <math.h>
#define boost ios_base::sync_with_stdio(false);cin.tie(0)
typedef long long ll;
#define pb push_back
#define F first
#define S second
#define vec std::vector<ll>
#define mp map<ll,ll>
#define fo(i,j,n) for(ll i=j;i<n;i++)
#define co cout<<
#define en <<"\n"
#define all(x) x.begin(),x.end()
#define mod 1000000007
#define so(x) sort(x.begin(),x.end())
#define re(x) reverse(x.begin(),x.end())
using namespace std;

int checking (int x,vector<ll>arr,int n)
{
    for(int i=0;i<n;i++)
    {
        if(arr[i]==x)
        {
            return i+1;
        }
    }

    return 0;
}
int main (){
    boost;
    ll t, i , j, k,n, x, y, z, x1, y1, z1,ans,g,p;
	cin >> t;
start: while(t--)
    {
        cin>>n>>x>>p>>k;
        vec v1;
        mp m1;
        fo(i,0,n)
        {
            cin>>g;
            m1[g]++;
            v1.pb(g);
        }

        sort(all(v1));

        if(v1[p-1]==x)
        {
            co 0 en;
            goto start;
        }

        if(p>k)
        {
            int index = checking(x,v1,n);
            if(index!=0)
            {
                if(index > p)
                {
                    co index-p en;
                }
                else
                {
                    co -1 en;
                }  
            }
            else
            {
                if(x<v1[p-1])
                {
                    co -1 en;
                }
                else
                {
                    ll lb = lower_bound(all(v1), x) - v1.begin();
                    int occ = m1[v1[index-1]];
                    co "occ= "<<occ en;
                    co lb-p+1 en;
                }
                
            }
            
        }

        else if(p==k)
        {
            int index = checking(x,v1,n);
            if(index!=0)
            {
               co abs(index-p) en;
            }
            else
            {
                if(x>v1[p-1])
                {
                    ll lb = lower_bound(all(v1), x) - v1.begin();
                    co lb-p+1 en;
                }
                else
                {
                     ll lb = lower_bound(all(v1), x) - v1.begin();
                     co p-lb en;
                }
            }

        }

        else
        {
            int index = checking(x,v1,n);
            if(index!=0)
            {
                if(index > p)
                {
                   co -1 en;
                }
                else
                {
                    co p-index en;
                }  
            }
            else
            {
                if(x>v1[p-1])
                {
                    co -1 en;
                }
                else
                {
                    ll lb = lower_bound(all(v1), x) - v1.begin();
                    co p-lb en;
                }
                
            }
        }
        
    }
return 0;
}


