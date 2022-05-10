<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property Answer $answer
 * @property Question $question
 * @property Survey $survey
 * @property Participant $participant
 *
 * @property Timestamp $created_at
 * @property Timestamp $updated_at
 *
 * Class Result
 * @package App\Models
 */
class Result extends Model
{
    use Timestamp;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

}
