#include <stdio.h>
#include <stdlib.h>

int main()
{
    int N;

    printf("Enter N: ");
    scanf("%d", &N);
    for(int i = 1; i <= N; i += 2)
    {
        printf("%d\n", i);
    }
    return 0;
}
