 const generateEmployeeID = ()=> {
    const timestamp = Date.now(); // 获取当前时间戳
    const employeeID = parseInt((timestamp+'').substring(5)); // 可以根据需求添加前缀
    return employeeID;
}

export default generateEmployeeID