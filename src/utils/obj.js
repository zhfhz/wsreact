/**
 * 树状结构数据，平铺展开
 * @param treeData 树顶级对象数组
 * @param childField 子节点 字段名
 * @returns {[]}
 */
export const floorTree = (treeData, childField) => {
  // treeData 是数组构建一个根节点
  const data =
    treeData instanceof Array ? { [childField]: treeData } : treeData;
  const result = [];
  const loop = (arr, parent = null) => {
    arr.forEach((item) => {
      item.parent = parent;
      result.push(item);
      if (item[childField]) {
        loop(item[childField], item);
      }
    });
  };
  loop(data[childField]);
  return result;
};

export const floorTreeWithKey = (treeData, childField) => {
  const data = floorTree(treeData, childField);
  return data.map((item, index) => {
    item.key = `key_index_${index}`;
    return item;
  });
};

export const linkItemsWidthField = (
  items,
  idName,
  parentIdName,
  childFieldName
) => {
  const result = [];
  const cache = [...items];
  let current = null;
  while (cache.length) {
    current = cache.pop();
    let parent = items.find((item) => item[idName] === current[parentIdName]);
    if (parent) {
      parent[childFieldName] = parent[childFieldName] || [];
      parent[childFieldName].push(current);
    } else {
      result.push(current);
    }
  }

  return result;
};

/**
 * 过滤指定值 的属性，用于清理多余的对象属性
 * @param target
 * @param value
 */
export const filterAttr = (target, value) => {
  const newTarget = { ...target };
  Object.keys(newTarget).forEach((key) => {
    if (typeof newTarget[key] === 'string') {
      newTarget[key] = newTarget[key].trim();
    }
    if (Object.is(newTarget[key], value)) {
      delete newTarget[key];
    }
  });
  return newTarget;
};

export const filterEmpty = (target) => {
  const filterNull = filterAttr(target, null);
  const filterUndefined = filterAttr(filterNull, void 0);
  const filterStr = filterAttr(filterUndefined, '');
  return filterStr;
};
