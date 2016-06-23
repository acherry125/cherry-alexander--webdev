
(function() {
    angular
        .module("EventHorizon")
        .controller("UserMessagesController", UserMessagesController);


    function UserMessagesController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.messageDict = {};
        vm.replyDict = {};
        vm.toggleMessage = toggleMessage;
        vm.replyMessage = replyMessage;

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
                            vm.replyDict[msgs[i]._id] = "";
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

        function replyMessage(recipientId, messageId, orgName) {
            // vm.messageContent doesn't seem like a good solution
            var message = {name: vm.user.username, organization: orgName, message: vm.replyDict[messageId]};
            UserService
                .sendMessage(recipientId, userId, message)
                .then(
                    function(response) {
                        vm.messageContent = "";
                        vm.success = "Message Sent!";
                        vm.replyDict[messageId] = "";
                    },
                    function(error) {
                        vm.error = error.data
                    }
                )
        }

    }

})();
