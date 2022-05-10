<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $answer_text
 * @property string $value
 * @property Question $question
 *
 * @property Timestamp $created_at
 * @property Timestamp $updated_at
 * Class Answer
 * @package App\Models
 */
class Answer extends Model
{
    use Timestamp;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'answer_text',
        'value',
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

    public function question(){
        return $this->belongsTo(Question::class);
    }
}
