<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $nickname
 * @property int $participant_id
 *
 * @property Survey[] $surveys
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
        'participant_id',
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
}
