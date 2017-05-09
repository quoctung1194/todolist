<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    /**
     * Login action
     *
     * @param Illuminate\Http\Request $request The request values
     * @return void
     */
    public function login(Request $request)
    {
        // get request params
        $email = $request->input('email');
        $password = $request->input('password');

        // query builder
        $query = User::where('email', $email);

        // invalid login
        if ($query->count() == 0) {
            return response()->json([
                'status' => false,
                'error' => __('default.user invalid login'),
            ]);
        }

        // valid login
        $isValidLogin = \Hash::check($password, $query->first()->password);
        if($isValidLogin) {
            return response()->json([
                'status' => true,
                'user' => $query->first(),
            ]);
        }


        // invalid login
        return response()->json([
            'status' => false,
            'error' => __('default.user invalid login'),
        ]);
    }
}
