"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@hwagfu/frameui/questionnaire"

export default function QuestionnaireDemo() {
  return (
    <Questionnaire className="w-full max-w-md">
      <QuestionnaireProgress />
      <QuestionnaireItem name="genre" required>
        <QuestionnaireTitle>Bạn thích thể loại nào nhất?</QuestionnaireTitle>
        <QuestionnaireDescription>Chúng tôi sẽ gợi ý phim phù hợp.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="action">
            Hành động
            <QuestionnaireChoiceDescription>Cháy nổ, rượt đuổi</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="drama">
            Chính kịch
            <QuestionnaireChoiceDescription>Cảm xúc, chiều sâu</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="anime">Hoạt hình</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="time" multiple>
        <QuestionnaireTitle>Bạn hay xem phim lúc nào?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="morning">Buổi sáng</QuestionnaireChoice>
          <QuestionnaireChoice value="evening">Buổi tối</QuestionnaireChoice>
          <QuestionnaireChoice value="weekend">Cuối tuần</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious>Quay lại</QuestionnairePrevious>
        <QuestionnaireNext>Tiếp</QuestionnaireNext>
        <QuestionnaireSubmit>Hoàn tất</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
