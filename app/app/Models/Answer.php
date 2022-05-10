<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $answer_text
 * @property string $value
 * @property Question $question
 * @property Result[] $results
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question(){
        return $this->belongsTo(Question::class);
    }

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

        static::deleting(function($answer) {
            $answer->results()->delete();
        });
    }
}
