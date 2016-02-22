var app=angular.module('shoppingCartApp',[]);
app.controller('shoppingCartController',function($scope,$http)
		{
			$scope.cartList=[];
			$scope.refresh=function()
			{
			$http.get('/cartList').success(function(response)
					{
						console.log(response);
						$scope.cartList=response;
						$scope.cart="";
						$scope.getTotal();
					}

				);							
			}
			$scope.refresh();
			$scope.addCart=function()
			{
					console.log($scope.cart);
				$http.post('/cartList',$scope.cart).success(function(response)
						{

							console.log("This is from db "+response);
							$scope.refresh();
						}

					)
			}

			$scope.deleteCart=function(id)
			{
				console.log("The id is "+id);
				$http.delete('/cartList/'+id);
				$scope.refresh();
			}

			$scope.editCart=function(id)
			{
				console.log("The id to edit is "+id);
				$http.get('/cartList/'+id).success(function(response)
				{
					$scope.cart=response;
				}
					)
				
			}
			
			$scope.updateCart=function()
			{
				$http.put('/cartList/'+$scope.cart._id,$scope.cart).success(function(response)
					{
						$scope.refresh();
					}
					)
			}
			$scope.getTotal=function()
			{
			$scope.total=0;	
				for(i=0;i<$scope.cartList.length;i++)
				{
					$scope.total+=parseFloat($scope.cartList[i].price);
				}
			}	
		}

	);