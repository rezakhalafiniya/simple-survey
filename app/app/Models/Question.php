<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;


/**
 * @property int $id
 * @property string $question_text
 * @property Survey $survey
 * @property Answer[] $answers
 *
 * @property Timestamp $created_at
 * @property Timestamp $updated_at
 *
 * Class Question
 * @package App\Models
 */
class Question extends Model
{
    use Timestamp;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question_text',
        'survey_id',
        'optional',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'optional' => 'boolean',
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

}
