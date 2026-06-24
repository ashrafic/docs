---
title: Conditions
sidebar_position: 2
---

Not every model event should trigger an automation. Conditions let you filter — fire only when the right record meets your criteria. The condition builder supports nine operators with AND/OR logic, all configurable through a visual repeater in the Filament UI.

---

## Condition Operators

Each operator implements the `ConditionOperator` interface:

```php
interface ConditionOperator
{
    public function evaluate(mixed $actual, mixed $expected, array $context = []): bool;
    public function key(): string;
    public function label(): string;
    public function requiresValue(): bool;
}
```

### All Operators

| Operator | Key | Requires Value | Description |
|---|---|---|---|
| **Equals** | `equals` | Yes | Value matches exactly. Numeric-aware: `"3"` equals `3`. |
| **Not Equals** | `not_equals` | Yes | Value does not match. Same numeric awareness. |
| **Contains** | `contains` | Yes | Works on strings (substring), arrays, and Laravel Collections |
| **Greater Than** | `greater_than` | Yes | Value is strictly greater |
| **Less Than** | `less_than` | Yes | Value is strictly less |
| **Is Empty** | `is_empty` | No | Value is null, empty string, empty array, or empty Collection |
| **Is Not Empty** | `is_not_empty` | No | Opposite of is_empty — value has content |
| **Changed** | `changed` | No | Field value changed from its original. Only available for Update events. |
| **Changed To** | `changed_to` | Yes | Field value changed AND new value matches expected. Update events only. |

---

## AND/OR Logic

Conditions support grouping with AND/OR logic:

- **All conditions within a group** are ANDed together — every one must be true
- **Groups separated by OR** — any group matching is sufficient

```
Condition 1: status = 'active'      ← AND
Condition 2: plan = 'enterprise'     ← AND
--- OR ---
Condition 3: role = 'admin'          ← standalone OR group
```

This fires if the user is an active enterprise customer OR if they're an admin.

### How It Works

Internally, the `ConditionEvaluator` splits conditions into OR groups. Each group is evaluated independently. If any group passes entirely, the trigger fires.

The UI shows conditions in a `ConditionBuilder` repeater where you add conditions, choose the operator, enter a value (if the operator requires one), and select the logic connector (AND or OR) for the next condition.

---

## Field Path Traversal

Conditions support dot-notation to traverse relationships:

```
user.team.plan = 'enterprise'
order.items.*.sku contains 'WIDGET'
profile.address.city = 'New York'
```

The field schema analyzer resolves these paths against the model's attributes and relations.

---

## Changed & Changed To Operators

These operators are unique — they leverage Eloquent's `getOriginal()` to compare against the model's state before the update.

### `changed`

Fires when a field's value is different from the original. No expected value needed.

```
User: name was 'John' → now 'Jane' → name changed: true ✓ fires
User: name was 'John' → now 'John' → name changed: false ✗ skipped
```

### `changed_to`

Fires when a field changed AND the new value matches your expected value. Useful for status transitions and workflow state changes.

```
Order: status was 'pending' → now 'completed' → status changed_to 'completed': true ✓ fires
Order: status was 'pending' → now 'cancelled' → status changed_to 'completed': false ✗ skipped
```

Both operators are automatically filtered out for `created` events (there are no "original" values to compare against).

---

## Configuring Conditions

In the trigger form, the "Only if these conditions match" section shows a repeater. Each row has:

| Field | Description |
|---|---|
| **Field** | Model attribute or relation path in dot notation |
| **Operator** | One of the nine operators from the dropdown |
| **Value** | Expected value (hidden for operators that don't require one) |
| **Logic** | AND or OR — connector to the next condition |

The payload preview updates live to show which conditions will be evaluated.

---

## Programmatic Access

You can evaluate conditions outside the Filament UI:

```php
use Ashrafic\FilamentAutomationBridge\Services\ConditionEvaluator;

$evaluator = app(ConditionEvaluator::class);
$passes = $evaluator->evaluate($trigger, $model);
```

The evaluator returns a boolean. Parse condition JSON directly if you need the raw results:

```php
$conditions = $trigger->conditions; // JSON-decoded array of condition objects
```

---

## Registering Custom Operators

Create a class implementing `ConditionOperator`:

```php
use Ashrafic\FilamentAutomationBridge\Contracts\ConditionOperator;

class StartsWithOperator implements ConditionOperator
{
    public function evaluate(mixed $actual, mixed $expected, array $context = []): bool
    {
        return is_string($actual) && str_starts_with($actual, (string) $expected);
    }

    public function key(): string { return 'starts_with'; }
    public function label(): string { return 'Starts With'; }
    public function requiresValue(): bool { return true; }
}
```

Register it:

```php
use Ashrafic\FilamentAutomationBridge\Conditions\ConditionRegistry;

app(ConditionRegistry::class)->register(new StartsWithOperator());
```

Your operator appears in the condition builder dropdown automatically.
