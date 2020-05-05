export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
};

// chooseAddress
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
};

// openSetting
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
};

//showModal 
export const showModal=(content)=>{
    console.log(content);
    
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content:content.content,
            success: (res) => {
              resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
          })
    })
}