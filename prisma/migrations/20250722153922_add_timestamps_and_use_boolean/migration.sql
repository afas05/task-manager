/*
  Warnings:

  - You are about to alter the column `done` on the `SubTasks` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `deleted` on the `SubTasks` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `deleted` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `SubTasks` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `done` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Task` MODIFY `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;
