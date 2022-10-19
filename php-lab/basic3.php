<?php
    //math
    $x = 24434;
    echo var_dump(is_int($x)) . "\n";
    echo (pi()) . "\n";

    //constant
    define("Myconstant", "ths is my constant\n");
    echo Myconstant;

    define("CarAry",[
        "Alphard",
        "Saga",
        "BMW",
        "Iswara"
    ]);
    echo CarAry[2] . "\n";

    //switch
    $favfood = "burger";
    switch($favfood){
        case "burger":
            echo "favourite food is burger\n";
            break;
        case "fish":
            echo "favourute food is fish\n";
            break;
        case "chicken":
            echo "favourute foo d is chicken\n";
            break;
        default:
            "unknown food\n";
            break;
    }
?>