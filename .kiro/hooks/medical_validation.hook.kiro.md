# Medical Accuracy Validation Hook

## TRIGGER CONDITIONS
- When generating anatomical content
- When creating assessment questions
- When updating clinical correlations
- When user submits medical queries

## VALIDATION ACTIONS
1. **Terminology Check**:
   - Cross-reference with Terminologia Anatomica
   - Validate against medical dictionaries
   - Flag unrecognized anatomical terms

2. **Clinical Accuracy**:
   - Verify evidence-based medicine sources
   - Check against current medical guidelines
   - Validate diagnostic accuracy

3. **Educational Appropriateness**:
   - Ensure content matches user level
   - Validate progressive difficulty
   - Check learning objectives alignment

## ERROR HANDLING
- **Low Confidence**: Flag for manual review
- **Medium Confidence**: Provide with disclaimer
- **High Confidence**: Auto-approve with citation

## SUCCESS METRICS
- Medical accuracy score > 95%
- User comprehension improvement
- Clinical application success rate