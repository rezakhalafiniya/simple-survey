<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $nickname
 * @property int $id
 *
 * @property Result[] $results
 *
 * Class Participant
 * @package App\Models
 */
class Participant extends Model
{
    use Timestamp;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nickname',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function results(){
        return $this->hasMany(Result::class);
    }

    /**
     * Add events for the model here
     */
    public static function boot() {
        parent::boot();

        static::deleting(function($participant) {
            $participant->results()->delete();
        });
    }
}
