
(function() {
    angular
        .module("EventHorizon")
        .controller("UserMessagesController", UserMessagesController);


    function UserMessagesController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.messageDict = {};
        vm.toggleMessage = toggleMessage;

        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                        vm.user.messages.reverse();
                        var msgs = vm.user.messages;
                        for(var i in msgs) {
                            vm.messageDict[msgs[i]._id] = false;
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
        
        init();

        function toggleMessage(messageId) {
            vm.messageDict[messageId] = !vm.messageDict[messageId]; 
        }

        function replyMessage(recipientId, orgName) {
            // vm.messageContent doesn't seme like a good solution
            var message = {name: vm.user.username, organization: orgName, message: vm.messageContent};
            UserService
                .sendMessage(recipientId, userId, message)
                .then(
                    function(response) {
                        vm.messageContent = "";
                        vm.success = "Message Sent!"
                    },
                    function(error) {
                        vm.error = error.data
                    }
                )
        }

    }

})();
