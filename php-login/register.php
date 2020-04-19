<?php
    //include config file
    require_once "config.php";

    //define variables and initialize with empty values
    $username = $password = $confirm_password = '';
    $username_err = $password_err = $confirm_password_err = '';

    //processing form data when form is submitted
    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Validate username
        if(empty(trim($_POST['username']))){
            $username_err = 'please4 enter a username.';
        }else{
            //prepare a select statement
            $sql = "SELECT id from users WHERE username = ?";

            if($stmt = mysqli_prepare($link , $sql)){
                //bind variables to prepared statement as parameters
                mysqli_stmt_bind_param($stmt, 's', $param_username);
                
                //set parameters
                $param_username = trim($_POST['username']);

            //attemp to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                //store result
                mysqli_stmt_store_result($stmt);

                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = 'This username is aready taken';
                }else{
                    $username = trim($_POST['username']);
                }
            }else{
                echo 'Oops! something went wrong. Please try again latyer.';
            }
        }

        //close statement
        mysqli_stmt_close($stmt);
    }

    //Validate password
    if(empty(trim($_POST['password']))){
        $password_err = "Please enter a password.";
    }elseif(strlen($_POST["password"]) < 6){
        $password_err = "Password must have at least 6 characters";
    }else{
        $password = trim($_POST["password"]);
    }

    //validate confirm password
    if(empty(trim($_POST['confirm_password']))){
        $confirm_password_err = 'Please confirm password.';
    }else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password !=$confirm_password)){
            $confirm_password_err = "Password did not match";
        }
    }

    //check input errors before inserting in databse
    if(empty($username_err) && empty($password_err) && empty ($confirm_password_err)){

        //Prepare an insert statement
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        
        if($stmt = mysqli_prepare($link, $sql)){
            //Bind variable to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);

            //set parameters
            $param_username = $username;
            $param_password = password_hash($password, PASSWORD_DEFAULT);

            //Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                //Redirect to login page
                header("location: login.php");
            }else{
                echo "Something went wrong. Please try again later.";
            }
        }

        //close statement
        mysqli_stmt_close($stmt);
    }

    //close connection
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{font:14px sans-serif;}
        .wrapper{width:350px; padding: 20px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h2>Sign Up</h2>
        <p>Please fill this form to create an account</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group<?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type ="password" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="form-group" <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?> </span>
            </div>
            <div class="form-group <?php echo (!empty ($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group"> 
                <input type="submit" class="btn btn-primary" value="Submit">
                <input type="reset" class="btn btn-default" value="Reset">
            </div>
            <p>Already have an account? <a href="login.php">Login here</a>.</p>
        </form>
    </div>
</body>
</html>