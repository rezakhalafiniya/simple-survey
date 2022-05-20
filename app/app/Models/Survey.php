<?php

namespace App\Models;

use Carbon\Traits\Timestamp;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $slug
 * @property Question[] $questions
 * @property Result[] $results
 *
 * @property Timestamp $created_at
 * @property Timestamp $updated_at
 *
 * Class Survey
 * @package App\Models
 */
class Survey extends Model
{
    use Timestamp;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'slug'
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
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function results()
    {
        return $this->hasMany(Result::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rules()
    {
        return $this->hasMany(Rule::class);
    }

    /**
     * Add events for the model here
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(
            function ($survey) {
                $survey->results()->delete();
                $survey->answers()->delete();
                $survey->questions()->delete();

            }
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function answers(){
        return $this->hasManyThrough(Answer::class,Question::class);
    }

    public function scopeGetResults(Builder $query, $survey_id, $participant_id)
    {
        $surveyResultsForParticipant = $query->where('id', $survey_id)->with(
            'results',
            function ($query) use ($participant_id) {
                return $query->where('participant_id',$participant_id)->with('answer:id,value');
            }
        )->with('rules')->get()->first();
        $calculatedResult = $this->calculateResult($surveyResultsForParticipant->results);
        $resultTextBasedOnRule = $this->getResultText($surveyResultsForParticipant->rules,$calculatedResult);

        return ['result_texts' => $resultTextBasedOnRule];
    }

    protected function calculateResult($surveyResults){
        $valueSum = 0;
        foreach ($surveyResults as $surveyResult){
            $valueSum = $valueSum + (int)$surveyResult->answer->value;
        }
        return $valueSum;
    }

    protected function getResultText($rules, $sumOfValue){
        $resultTexts = [];
        foreach ($rules as $rule){
            $ruleArray = str_getcsv($rule->logic,';');
            $operand = $ruleArray[0];
            $value = $ruleArray[1];
            switch ($operand){
                case '<':
                    if($sumOfValue < $value){
                        $resultTexts[] = $rule->result_text;
                    }
                    break;
                case '>':
                    if($sumOfValue > $value){
                        $resultTexts[] = $rule->result_text;
                    }
                    break;
                case '<=':
                    if($sumOfValue <= $value){
                        $resultTexts[] = $rule->result_text;
                    }
                    break;
                case '>=':
                    if($sumOfValue >= $value){
                        $resultTexts[] = $rule->result_text;
                    }
                    break;
            }
        }
        return $resultTexts;
    }
}
