import React from 'react'
import { useRef } from 'react';
import eyeSolid from '../../public/icons/eye-solid.svg';
import eyeSlashSolid from '../../public/icons/eye-slash-solid.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    let c;
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ url: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        setPasswordArray(passwords);
        console.log(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, []);
    const callAlert = (msg, timeout) => {
        alert(msg, 3000);
    }

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src === eyeSlashSolid) {
            callAlert('Show the Password !!');
            ref.current.src = eyeSolid;
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = eyeSlashSolid;
            passwordRef.current.type = "password";
        }
    };

    const savePassword = async () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // if any such id exists in the db, delete it.
            await fetch('http://localhost:3000/', {
                method: "DELETE", headers: {
                    'Content-Type':
                        "application/json"
                }, body: JSON.stringify({ id: form.id })
            })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            // console.log([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch('http://localhost:3000/', {
                method: "POST", headers: {
                    'Content-Type':
                        "application/json"
                }, body: JSON.stringify({ ...form, id: uuidv4() })
            })
            setForm({ url: "", username: "", password: "" });
            saveText();
        }
        else {
            toast("Error : Password doesn't saved.")
        }
    };
    const editPassword = (id) => {
        console.log("Editing password with id " + id);
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id });
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };
    const deletePassword = async (id) => {
        console.log("Deleting password with id " + id);
        c = confirm("Do you really want to delete this entry?");
        if (c) {
            deleteText();
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            let res = await fetch('http://localhost:3000/', {
                method: "DELETE", headers: {
                    'Content-Type':
                        "application/json"
                }, body: JSON.stringify({ id })
            })
        }
    };
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const saveText = () => {
        toast.success('Successfully saved.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    const deleteText = () => {
        toast.error('Deleted !!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div className='mx-auto md:mycontainer md:px-20 sm:px-10 px-0'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div></div>
            <div className='flex flex-col text-black p-5 gap-3 '>
                <div className='flex flex-col gap-1 m-10 items-center'>
                    <h1 className='text-4xl font-bold'><span className='text-green-700'>&lt;</span><span>Pass</span><span className='text-green-700'>OP</span><span className='text-green-700'>/&gt;</span></h1>
                    <p className='text-green-900 text-lg overline'>Your Own Password Manager</p>
                </div>
                <div className='w-full flex flex-col gap-3 text-sm items-center'>
                    <form className='flex flex-col gap-3' method='post'>
                        <input value={form.url} onChange={handleChange} type='text' name="url" placeholder='Enter Website URL' id='url' className='lg:w-[880px] w-[258px] md:w-[680px] border-2 bg-white border-green-500 rounded-2xl px-4 py-1 text-black font-bold'></input>
                        <div className='flex-col md:flex-row flex md:gap-8 gap-3 items-center md:justify-center w-full'>
                            <div><input id='username' value={form.username} name="username" onChange={handleChange} type='text' autoComplete="username" placeholder='Enter Username' className='border-1 bg-white border-black w-[258px] md:w-[324px] lg:w-[424px] rounded-2xl px-4 py-1 text-black font-bold'></input></div>
                            <div className='relative'><input ref={passwordRef} name="password" autoComplete="current-password" id='password' value={form.password} onChange={handleChange} type='password' placeholder='Enter Password' className='border-1 bg-white border-black lg:w-[424px] w-[258px] md:w-[324px] rounded-2xl px-4 py-1 text-black font-bold'></input>
                                <div className='absolute right-[21px] top-2 cursor-pointer'><img ref={ref} onClick={showPassword} className='h-4 w-4' src={eyeSlashSolid}></img></div></div>
                        </div>
                    </form>
                    <button onClick={savePassword} className='flex justify-center items-center cursor-pointer mt-4 gap-1 bg-green-400 hover:bg-green-300 rounded-4xl p-0.5 px-5 border-2 border-green-800 w-fit'>
                        <lord-icon className="w-6 "
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon> <span className=''>Save Password</span>
                    </button>
                </div>
                <div className='passwordTable flex flex-col md:p-4 p-0 mt-2'>
                    {(passwordArray.length !== 0) && <h2 className='font-bold text-xl text-emerald-950'>Your Passwords </h2>}
                    {(passwordArray.length === 0) && (<div className='font-bold text-xl m-16 text-center uppercase text-emerald-950'>No Password to show</div>)}
                    {(passwordArray.length !== 0) && <table className="table-auto mt-3 rounded-lg overflow-hidden  w-full border-2 border-black">
                        <thead className='bg-emerald-800 text-white'>
                            <tr className='text-white text-xs sm:text-md md:text-[16px]'>
                                <th className='py-1.5'>Website URL</th>
                                <th className='py-1.5'>Username</th>
                                <th className='py-1.5'>Password</th>
                                <th className='py-1.5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} className=''>
                                    <td className='md:min-w-30 w-10 text-xs sm:text-md md:text-[16px] sm:min-w-20 py-1 border border-white text-center '>
                                        <div className='justify-center items-center flex gap-2'>
                                            <a href=
                                                {item.url} className='cursor-pointer underline hidden sm:block' target='_blank'>{item.url}</a>
                                            <div className='flex' onClick={() => copyText(item.url)}><lord-icon
                                                className="h-5 cursor-pointer"
                                                src="https://cdn.lordicon.com/zhgkkdks.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='md:min-w-25 w-10 text-xs sm:text-md md:text-[16px] sm:min-w-15 py-1 border border-white text-center '>
                                        <div className='justify-center items-center gap-2 flex'>
                                            <a href=
                                                {item.username} className='cursor-pointer hidden sm:block' target='_blank'>{item.username}</a>
                                            <div className='flex' onClick={() => copyText(item.username)}><lord-icon
                                                className="h-5 cursor-pointer"
                                                src="https://cdn.lordicon.com/zhgkkdks.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='md:min-w-25 w-10 text-xs sm:text-md md:text-[16px] sm:min-w-15 py-1 border border-white text-center '>
                                        <div className='justify-center items-center flex gap-2'>
                                            <a href=
                                                {item.password} className='cursor-pointer hidden sm:block' target='_blank'>{"*".repeat(item.password.length)}</a>
                                            <div className='flex' onClick={() => copyText(item.password)}><lord-icon
                                                className="h-5 cursor-pointer"
                                                src="https://cdn.lordicon.com/zhgkkdks.json"
                                                trigger="hover"
                                            >
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='border md:max-w-20 w-5  text-xs sm:text-md md:text-[16px] sm:min-w-10 text-center py-1 border-white'>
                                        <div className='justify-center items-center flex gap-3'>
                                            <span className='justify-center items-center flex' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    className="w-5 cursor-pointer"
                                                    src="https://cdn.lordicon.com/vwzukuhn.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>
                                            <span className='justify-center items-center flex' onClick={() => { deletePassword(item.id) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    className="cursor-pointer w-5">
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td >
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default Manager;
