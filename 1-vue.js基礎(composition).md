### 1. `setup` 函數

`setup` 函數是組合式 API 的核心，所有的組合式邏輯都會在這個函數內部實現。它是每個組件的入口點，類似於選項式 API 中的 `data`、`computed`、`methods` 等。

```javascript
export default {
  setup() {
    // 在這裡撰寫組合式 API 的邏輯

    return {
      // 返回對象中的屬性和方法可以在模板中使用
    };
  },
};
```

### 2. `reactive`

`reactive` 函數用於創建一個響應式對象。當對象的屬性變化時，視圖會自動更新。

```javascript
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({ count: 0 });

    return {
      state,
    };
  },
};
```

在這個範例中，我們創建了一個包含 `count` 屬性的響應式對象 `state`。

### 3. `ref`

`ref` 用於創建一個響應式的引用。通常用於基本類型數據，但也可以用於對象。

```javascript
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
};
```

這裡 `count` 是一個響應式引用，它的值可以在模板中綁定和修改。

### 4. `computed`

`computed` 函數用於創建計算屬性。它可以基於響應式狀態計算並返回新的值。

```javascript
import { ref, computed } from "vue";

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);

    return {
      count,
      doubled,
    };
  },
};
```

這裡 `doubled` 是一個計算屬性，它會根據 `count` 的值變化而自動更新。

### 5. `watch` 和 `watchEffect`

`watch` 和 `watchEffect` 用於監聽響應式數據的變化並執行一些操作。

```javascript
import { ref, watch } from "vue";

export default {
  setup() {
    const count = ref(0);

    watch(count, (newValue, oldValue) => {
      console.log(`count 變化了：從 ${oldValue} 變為 ${newValue}`);
    });

    return {
      count,
    };
  },
};
```

當 `count` 的值變化時，`watch` 內的回調函數會被執行。

### 結論

組合式 API 提供了更靈活的方式來組織和重用代碼。它使得功能更容易被抽象和管理，特別是在大型或複雜的組件中。理解上述概念是學習和使用 Vue 3 組合式 API 的關鍵。
