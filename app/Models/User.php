<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasRoles, HasApiTokens , HasFactory, Notifiable;

    
    protected static function boot()
    {
        parent::boot();

        // Sync the `role` column when the user is saved
        static::saved(function ($user) {
            if ($user->roles->isNotEmpty()) {
                $user->update(['role' => $user->roles->first()->name]);
            } else {
                $user->update(['role' => null]);
            }
        });
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'profile_photo',
        'status',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function assignRole($role)
    {
        // Assign the role using Spatie's package
        parent::assignRole($role);

        // Sync the `role` column in the `users` table
        $this->update(['role' => is_array($role) ? $role[0] : $role]);

        return $this;
    }

    public function removeRole($role)
    {
        // Remove the role using Spatie's package
        parent::removeRole($role);

        // Clear the `role` column if no roles are left
        if ($this->roles->isEmpty()) {
            $this->update(['role' => null]);
        }

        return $this;
    }
}
