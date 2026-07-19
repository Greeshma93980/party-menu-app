import { createContext,useState,useEffect } from "react";

export const AuthContext=createContext(null);

export function AuthProvider({children})
{
    const[token,setToken]=useState(()=>localStorage.getItem("party_menu_token")|| null);
    const[user,setUser]=useState(()=>{
        const saveduser=localStorage.getItem("party_menu_user");
        if(saveduser)
        {
            return JSON.parse(saveduser);
        }
        return null;
    });
    const [savedrecipes,setSavedrecipes]=useState(()=>{
        const savedList=localStorage.getItem("party_menu_saved_recipes");
        if(savedList)
        {
            return JSON.parse(savedList);
        }
        return [];
    });
    useEffect(()=>{
        localStorage.setItem("party_menu_saved_recipes", JSON.stringify(savedrecipes));
    },[savedrecipes]);

    const login =async(email,password)=>{
        console.log("Attempting login for:", email);;
        try{
            const response=await fetch("https://serverless-api-teal.vercel.app/api/auth/signin",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({email:email,password:password}),
            });
            const data=await response.json();
            console.log("Student log:Got API data ->",data);
            if(data.success===true)
            {
                localStorage.setItem("party_menu_token",data.data.token);
                localStorage.setItem("party_menu_user",JSON.stringify(data.data.user));
                setToken(data.data.token);
                setUser(data.data.user);
                return {success:true};

            }
            else{
                return {success:false, message:data.message || "Invalid credentials"};

            }

        }
        catch(error)
        {
            console.error("Student log: Network error caught!",error);
            return{
                success:false,
                message:"Something went wrong.Check connection."
            };
        }
    };

    const logout=() =>{
        console.log("Student Log: Logging out user...");
        localStorage.removeItem("party_menu_token");
        localStorage.removeItem("party_menu_user");
        setToken(null);
        setUser(null);
    };
    const togglesaverecipe=(dish)=>{
        const isalreadysaved=savedrecipes.some((item)=>String(item.id)===String(dish.id));
        if(isalreadysaved)
        {
            const updatedList=savedrecipes.filter((item)=>String(item.id)!==String(dish.id));
            setSavedrecipes(updatedList);

        }
        else{
            setSavedrecipes([...savedrecipes,dish]);
        }
    };
    const removerecipe=(id)=>{
        const updatedList=savedrecipes.filter((item)=>String(item.id)!==String(id));
        setSavedrecipes(updatedList);

    };
    return(
        <AuthContext.Provider
        value={{
            token:token,
            user:user,
            savedrecipes:savedrecipes,
            isAuthenticated : !!token,
            login:login,
            logout:logout,
            togglesaverecipe: togglesaverecipe,
            removerecipe: removerecipe,

        }}
        >
        {children}
        </AuthContext.Provider>
    );

}